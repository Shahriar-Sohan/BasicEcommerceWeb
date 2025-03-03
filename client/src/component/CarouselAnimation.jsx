import { useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
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

        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="w-full h-[600px] overflow-hidden">
            <div ref={elementRef} className="flex w-full h-full">
                {banners.map((data, index) => (
                    <Link className="flex-shrink-0 w-full h-full object-cover cursor-pointer" to='/products' >
                        <img
                            key={index}
                            src={data}
                            alt={`Banner ${index}`}
                            className="flex-shrink-0 w-full h-full object-cover cursor-pointer"
                        />
                    </Link>

                ))}
            </div>
        </div>
    );
}

export default CarouselAnimation;