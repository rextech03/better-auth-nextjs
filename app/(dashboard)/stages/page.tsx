import { SparkleIcon } from "lucide-react";

export default function Page(){

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <p className="text-sm">Please pick a stage</p>
            <div className="flex justify-center items-center">
                <SparkleIcon className="w-10 h-10 text-blue-500 animate-bounce" />
                <span className="text-xl">PRE LAUNCH</span>
            </div>

        </div>
    )
}