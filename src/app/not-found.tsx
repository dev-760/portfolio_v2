import Link from "next/link";

export default function NotFound() {
    return (
        <div className="not-found-page">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">
                It seems you&apos;ve lost your way in the darkness.
            </p>
            <Link href="/en" className="not-found-link">
                Return Home
            </Link>
        </div>
    );
}
