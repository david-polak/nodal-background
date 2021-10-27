import {useEffect, useState} from "react";

let counter = 0

function render(canvas: any, time: any) {


    counter = counter + 1

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillRect(25 +counter, 25, 100, 100);
        ctx.clearRect(45 + counter, 45, 60, 60);
        ctx.strokeRect(50 + counter, 50, 50, 50);
    }

    requestAnimationFrame((time) => {
        render(canvas, time);
    });
}

function display(container: any) {
    const canvas = document.createElement("canvas")

    requestAnimationFrame((time) => {
        render(canvas, time);
    });

    container.appendChild(canvas)
}

export function useNodalBackground(props: any) {
    const [container, setContainer] = useState(props.container);

    useEffect(() => {
        if (container) {
            display(container)
        }
    }, [container]);

    return {
        container,
        setContainer
    }
}
