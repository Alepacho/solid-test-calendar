// ! хук чисто для дебага
type LoopHandler = Function;
type LoopTimer = number | undefined;

const useLoop = (handler: LoopHandler, timer: LoopTimer) => {
    handler();
    const id = setTimeout(() => useLoop(handler, timer), timer);
}

export default useLoop;