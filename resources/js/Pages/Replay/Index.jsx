import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import gmapsLoader from "@/Libs/GmapsLoader";
import gmaps from "gmaps";
import moment from "moment/moment";

import InputLabel from "@/Components/Atom/InputLabel";
import ComboBox from "@/Components/Atom/ComboBox";
import InputError from "@/Components/Atom/InputError";
import DateTimeInput from "@/Components/Atom/DateTimeInput";
import Button from "@/Components/Atom/Button";

import { IconButton, Slider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TuneIcon from "@mui/icons-material/Tune";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";

export default function Index() {
    const { devices, periods } = usePage().props;
    const [map, setMap] = useState(null);
    const [isCustom, setIsCustom] = useState(false);
    const [isHistoryShow, setIsHistoryShow] = useState(false);

    const [positions, setPositions] = useState([]);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);

    const timerRef = useRef();

    const { data, setData, post, processing, errors, reset } = useForm({
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

        console.log(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(data);

        map.removePolylines();
        map.removeMarkers();
        const response = await axios.post(route("replay.store"), data);

        if (response.data.length > 1) {
            setIsHistoryShow(true);
            setIndex(0);
            setPositions(response.data);

            const wayPointsData = response.data.map((value) => ({
                lat: value.latitude,
                lng: value.longitude,
            }));

            map.drawPolyline({
                path: wayPointsData,
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 2,
            });
        } else {
            toast.error("No position data.");
        }
    };

    useEffect(() => {
        gmapsLoader.load().then(() => {
            const initMap = new gmaps({
                el: "#map",
                lat: 1.1134006,
                lng: 104.0652815,
                zoom: 11,
                disableDefaultUI: true,
            });

            setMap(initMap);
        });
    }, []);

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

    useEffect(() => {
        if (positions.length > 0 && map) {
            map.removeMarkers();
            map.addMarker({
                lat: positions[index].latitude,
                lng: positions[index].longitude,
            });
        }
    }, [map, index, positions]);

    return (
        <div className="hidden lg:block h-screen">
            <Head title="Replay" />
            <Toaster />

            <div className="relative h-screen bg-gray-100">
                <div id="map" className="relative w-full h-screen" />

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
                                onClick={(e) => setIsHistoryShow(false)}
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

                                    <InputError
                                        message={errors.device_id}
                                        className="mt-2"
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
                                            // setData("period", e);
                                        }}
                                        selectedBy="type"
                                        showBy="type"
                                    />

                                    <InputError
                                        message={errors.period}
                                        className="mt-2"
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

                                            <InputError
                                                message={errors.from}
                                                className="mt-2"
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

                                            <InputError
                                                message={errors.to}
                                                className="mt-2"
                                            />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        disabled={processing}
                                        // onClick={handleSubmit}
                                    >
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
