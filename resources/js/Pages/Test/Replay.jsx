import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import moment from "moment/moment";

import MapView, { map } from "@/Components/Map/Core/MapView";
import MapRoutePath from "@/Components/Map/MapRoutePath";
import MapRoutePoints from "@/Components/Map/MapRoutePoints";
import MapPositions from "@/Components/Map/MapPositions";
import InputLabel from "@/Components/Atom/InputLabel";
import ComboBox from "@/Components/Atom/ComboBox";
import DateTimeInput from "@/Components/Atom/DateTimeInput";
import Button from "@/Components/Atom/Button";

import { IconButton, Slider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TuneIcon from "@mui/icons-material/Tune";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";

export default function Replay() {
    const { devices, periods } = usePage().props;
    const timerRef = useRef();

    const [isCustom, setIsCustom] = useState(false);
    const [isHistoryShow, setIsHistoryShow] = useState(false);

    const [positions, setPositions] = useState([]);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);

    const { data, setData } = useForm({
        device_id: devices[0].id,
        from: moment().startOf("day").valueOf(),
        to: moment().endOf("day").valueOf(),
    });

    const handlePeriod = (type) => {
        setIsCustom(type === "Custom");

        if (type === "Custom") {
            setData({
                ...data,
                from: moment().valueOf(),
                to: moment().add(1, "hour").valueOf(),
            });
        } else {
            setData({
                ...data,
                from: moment().startOf("day").valueOf(),
                to: moment().endOf("day").valueOf(),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(route("replay.store"), data);

        if (response.data.length > 1) {
            setIsHistoryShow(true);
            setIndex(0);
            setPositions(response.data);

            map.setZoom(20);
        } else {
            toast.error("No position data.");
        }
    };

    useEffect(() => {
        if (playing && positions.length > 0) {
            timerRef.current = setInterval(() => {
                setIndex((index) => index + 1);
            }, 500);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [playing, positions]);

    useEffect(() => {
        if (index >= positions.length - 1) {
            clearInterval(timerRef.current);
            setPlaying(false);
        }
    }, [index, positions]);

    const onPointClick = (index) => {
        setIndex(index);
    };

    useEffect(() => {
        map.setCenter({
            lat: 1.1134006,
            lng: 104.0652815,
        });
    }, []);

    return (
        <div className="hidden lg:block h-screen">
            <Head title="Replay" />
            <Toaster />

            <div className="relative h-screen bg-gray-100">
                <MapView>
                    <MapRoutePath positions={positions} />
                    <MapRoutePoints
                        positions={positions}
                        onClick={onPointClick}
                    />
                    {index < positions.length && (
                        <MapPositions positions={[positions[index]]} />
                    )}
                </MapView>

                <div className="absolute w-96 top-2 left-2 z-10 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center px-4 py-2">
                        <div className="flex space-x-5 items-center">
                            <Link
                                className="cursor-pointer rounded-md hover:bg-gray-100 px-2 py-2"
                                href={route("positions.index")}
                            >
                                <ArrowBackIcon />
                            </Link>

                            <h1 className="text-xl font-semibold">Replay</h1>
                        </div>
                        {isHistoryShow && (
                            <button
                                className="rounded-md hover:bg-gray-100 px-2 py-2"
                                onClick={(e) => {
                                    setPositions([]);
                                    map.removeMarkers();
                                    setIsHistoryShow(false);
                                }}
                            >
                                <TuneIcon />
                            </button>
                        )}
                    </div>
                </div>

                {!isHistoryShow && (
                    <div className="absolute w-96 top-20 left-2 z-10 bg-white rounded-lg shadow-md">
                        <div className="p-4">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <InputLabel
                                        htmlFor="device_id"
                                        value="Device"
                                    />

                                    <ComboBox
                                        data={devices}
                                        onChange={(e) =>
                                            setData("device_id", e)
                                        }
                                        selectedBy="device_id"
                                        showBy="name"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="period"
                                        value="Period"
                                    />

                                    <ComboBox
                                        data={periods}
                                        onChange={(e) => {
                                            handlePeriod(e);
                                        }}
                                        selectedBy="type"
                                        showBy="type"
                                    />
                                </div>
                                {isCustom && (
                                    <>
                                        <div>
                                            <InputLabel
                                                htmlFor="from"
                                                value="From"
                                            />

                                            <DateTimeInput
                                                id="from"
                                                name="from"
                                                value={moment(data.from).format(
                                                    "YYYY-MM-DDTHH:mm"
                                                )}
                                                onChange={(e) =>
                                                    setData(
                                                        "from",
                                                        moment(
                                                            e.target.value
                                                        ).valueOf()
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="to"
                                                value="To"
                                            />

                                            <DateTimeInput
                                                id="to"
                                                name="to"
                                                value={moment(data.to).format(
                                                    "YYYY-MM-DDTHH:mm"
                                                )}
                                                onChange={(e) =>
                                                    setData(
                                                        "to",
                                                        moment(
                                                            e.target.value
                                                        ).valueOf()
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                            />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <Button fullWidth type="submit">
                                        Show
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isHistoryShow && (
                    <div className="absolute w-96 top-20 left-2 z-10 bg-white rounded-lg shadow-md">
                        <div className="p-4 space-y-0">
                            <h1 className="text-lg text-center">Device Name</h1>

                            <Slider
                                max={positions.length - 1}
                                step={null}
                                marks={positions.map((_, index) => ({
                                    value: index,
                                }))}
                                value={index}
                                onChange={(_, index) => setIndex(index)}
                            />

                            <div className="flex space-x-5 justify-center items-center">
                                <p>
                                    {index + 1}/{positions.length}
                                </p>
                                <div className="flex">
                                    <IconButton
                                        onClick={() =>
                                            setIndex((index) => index - 1)
                                        }
                                        disabled={playing || index <= 0}
                                    >
                                        <FastRewindIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setPlaying(!playing)}
                                        disabled={index >= positions.length - 1}
                                    >
                                        {playing ? (
                                            <PauseIcon />
                                        ) : (
                                            <PlayArrowIcon />
                                        )}
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            setIndex((index) => index + 1)
                                        }
                                        disabled={
                                            playing ||
                                            index >= positions.length - 1
                                        }
                                    >
                                        <FastForwardIcon />
                                    </IconButton>
                                </div>
                                <div>
                                    {moment(
                                        positions[index].device_time
                                    ).format("YYYY-MM-DD HH:mm:ss")}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
