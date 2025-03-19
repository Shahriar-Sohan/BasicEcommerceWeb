import { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import banner1 from "../assets/banner-1.webp";
import banner2 from "../assets/banner-2.webp";
import banner3 from "../assets/banner-3.webp";

const banners = [banner1, banner2, banner3];

function CarouselAnimation() {
    const countRef = useRef(0);
    const elementRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const duration = 2000;

        function easeInOutQuint(x) {
            return x < 0.5
                ? 16 * x * x * x * x * x
                : 1 - Math.pow(-2 * x + 2, 5) / 2;
        }

        function animate() {
            const startTime = performance.now();
            const startPosX = -element.offsetWidth * countRef.current;
            const endPosX = -element.offsetWidth * ((countRef.current + 1) % banners.length);

            function update() {
                let elapsedTime = performance.now() - startTime;
                let progress = Math.min(elapsedTime / duration, 1);
                element.style.transform = `translateX(${startPosX + (endPosX - startPosX) * easeInOutQuint(progress)}px)`;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    countRef.current = (countRef.current + 1) % banners.length;
                }
            }
            requestAnimationFrame(update);
        }

        intervalRef.current = setInterval(animate, 3500);

        const handleResize = () => {
            if (countRef.current > 0) {
                element.style.transform = `translateX(-${element.offsetWidth * countRef.current}px)`;
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(intervalRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="hidden md:block w-full h-[600px] overflow-hidden relative">
            <div ref={elementRef} className="flex w-full h-full transition-transform duration-500 ease-in-out">
                {banners.map((data, index) => (
                    <Link key={index} className="flex-shrink-0 w-full h-full cursor-pointer" to='/products'>
                        <img
                            src={data}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </Link>
                ))}
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === countRef.current % banners.length ? "bg-white" : "bg-white/50"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default CarouselAnimation;