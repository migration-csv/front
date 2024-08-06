/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ljdJvwzldNm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from "next/image";
import { SVGProps } from "react";

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
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
    <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MovieDetails = ({
  title,
  releaseDate,
  duration,
  genres,
  director,
  synopsis,
  cast,
  reviews,
}: MovieDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid gap-4">
        <Image
          src="/placeholder.svg"
          alt="Movie Poster"
          width={600}
          height={900}
          className="rounded-lg object-cover aspect-[2/3]"
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-primary">
            <StarIcon className="w-5 h-5 fill-current" />
            <StarIcon className="w-5 h-5 fill-current" />
            <StarIcon className="w-5 h-5 fill-current" />
            <StarIcon className="w-5 h-5 fill-current" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
          </div>
          <div className="text-lg font-medium">4.5</div>
          <div className="text-muted-foreground text-sm">(123 reviews)</div>
        </div>
      </div>
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="grid gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="w-5 h-5" />
            <span>{releaseDate}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ClockIcon className="w-5 h-5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TagIcon className="w-5 h-5" />
            <span>{genres}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <UserIcon className="w-5 h-5" />
            <span>Directed by {director}</span>
          </div>
        </div>
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold">Synopsis</h2>
          <p className="text-muted-foreground">{synopsis}</p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold">Cast</h2>
          <div className="flex flex-wrap gap-2">
            {/* {cast.map((member) => (
              <div key={member.name} className="flex items-center gap-2">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                  style={{ aspectRatio: "40/40", objectFit: "cover" }}
                />
                <span>{member.name}</span>
              </div>
            ))} */}
          </div>
        </div>
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">User Reviews</h2>
          <div className="grid gap-4">
            {/* {reviews.map((review, index) => (
              <div
                key={index}
                className="grid gap-2 border-l-4 border-primary pl-4"
              >
                <div className="flex items-center gap-2 text-primary">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 fill-current ${
                        i < review.rating
                          ? ""
                          : "fill-muted stroke-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="font-medium">{review.text}</div>
                <p className="text-muted-foreground">{review.text}</p>
                <div className="text-sm text-muted-foreground">
                  - {review.author}
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
