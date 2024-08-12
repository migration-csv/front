"use client";

import {apiBase} from "@/lib/functions";
import {ArrowLeftIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useParams} from "next/navigation";
import {SVGProps, useEffect, useState} from "react";

type Review = {
    rating: number;
    text: string;
    author: string;
};

type CastMember = {
    name: string;
    image: string;
};

type MovieDetailsProps = {
    title: string;
    releaseDate: string;
    duration: string;
    genres: string;
    director: string;
    synopsis: string;
    cast: CastMember[];
    reviews: Review[];
};

const MovieDetails = () => {
    const params = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieProps>();
    const [imdbDetails, setImdbDetails] = useState<ImdbDetailProps>();

    async function handleGetTmdbId(movieId: number) {
        const response = await fetch(`${apiBase}/movie/get-tmd-id/${movieId}`);
        const data = await response.json();
        return data.tmdbId;
    }

    const apiTmdb = process.env.NEXT_PUBLIC_API_BASE_TMDB;
    const apiKeyTmdb = process.env.NEXT_PUBLIC_API_KEY_TMDB;
    const apiKeyImdb = process.env.NEXT_PUBLIC_API_KEY_IMDB;
    const apiTmdbImg = process.env.NEXT_PUBLIC_API_BASE_TMDB_IMG;
    const apiImdb = process.env.NEXT_PUBLIC_API_BASE_IMDB_SEARCH;

    async function getTmdbMovieDetails() {
        const tmdbId = await handleGetTmdbId(Number(params.movieId));
        const url = `${apiTmdb}/${tmdbId}?api_key=${apiKeyTmdb}`;

        await fetch(url)
            .then((response) => response.json())
            .then(async (data) => {
                await getImdbMovieDetails(data?.imdb_id);
                setMovieDetails(data);
            });
    }

    function formatGenres(genres: Genre[] | undefined) {
        if (!genres) return;
        return genres.map((genre) => genre.name).join(", ");
    }

    function convertRatingToStars(rating: number | undefined): number {
        if (!rating) return 0;
        return Math.round(rating / 2);
    }

    async function getImdbMovieDetails(imdbId: number) {
        const url = `${apiImdb}/?i=${imdbId}&apikey=${apiKeyImdb}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setImdbDetails(data);
    }

    useEffect(() => {
        getTmdbMovieDetails();
    }, []);

    return (
        <>
            <div className="w-full m-4">
                <Link className="flex gap-2 items-center" href="/search">
                    <ArrowLeftIcon className="w-5 h-5"/>
                    <span>Back</span>
                </Link>
            </div>
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="flex flex-wrap gap-6 max-w-6xl mx-auto p-4 md:p-6">
                    <div className="flex flex-col gap-4 flex-1 min-w-full md:min-w-0">
                        <div className="relative w-full h-96">
                            <Image
                                src={imdbDetails?.Poster as string}
                                alt={movieDetails?.title as string}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-primary">
                                {[...Array(5)].map((_, index) => (
                                    <StarIcon
                                        key={index}
                                        className={`w-5 h-5 fill-current ${
                                            index < convertRatingToStars(movieDetails?.vote_average)
                                                ? "text-yellow-500"
                                                : "text-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                            <div className="text-lg font-medium">
                                {movieDetails?.vote_average}
                            </div>
                            <div className="text-muted-foreground text-sm">
                                ({movieDetails?.vote_count} reviews)
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 flex-1 min-w-full md:min-w-0">
                        <h1 className="text-3xl font-bold">{movieDetails?.title}</h1>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarIcon className="w-5 h-5"/>
                                <span>{movieDetails?.release_date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <ClockIcon className="w-5 h-5"/>
                                <span>{imdbDetails?.Runtime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <TagIcon className="w-5 h-5"/>
                                <span>{formatGenres(movieDetails?.genres)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <UserIcon className="w-5 h-5"/>
                                <span>Directed by {imdbDetails?.Director}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <DollarSignIcon/>
                                <span>Box Office: {imdbDetails?.BoxOffice}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold">Synopsis</h2>
                            <p className="text-muted-foreground">{movieDetails?.overview}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold">Cast</h2>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                    <span>{imdbDetails?.Actors}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
};

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
    </svg>
);

const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
    </svg>
);

const StarIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
);

const TagIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path
            d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/>
        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
    </svg>
);

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
);

function DollarSignIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
    );
}

export default MovieDetails;
