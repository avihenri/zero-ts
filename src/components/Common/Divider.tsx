import clsx from "clsx";

const Divider = ({ classNames } : { classNames?: string}) => (
    <hr className={clsx(
        "my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10 m-auto",
        classNames
    )} />
);
export default Divider;