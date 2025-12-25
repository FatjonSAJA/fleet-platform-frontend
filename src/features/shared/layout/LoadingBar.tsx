import { useEffect, useState } from "react";
import { useLoadingStore } from "@/stores/shared/loadingStore";

interface LoadingBarProps {
  className?: string;
}

export function LoadingBar({ className }: LoadingBarProps) {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 60) {
            clearInterval(interval);
            return 60;
          }
          return prev + 1;
        });
      }, 22);

      return () => clearInterval(interval);
    } else if (isVisible) {
      setProgress(100);

      const timeout = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isLoading, isVisible]);

  return (
    <div
      className={`relative h-[3px] ${className ?? "bg-linear-to-l from-[#3fcce5] to-[#52a9f1]"}`}
    >
      {isVisible && (
        <div
          className="absolute left-0 top-0 h-full bg-[#32cd32] transition-all duration-200 ease-out"
          style={{
            width: `${progress}%`,
            boxShadow: "0 2px 8px rgba(50, 205, 50, 0.6)",
          }}
        />
      )}
    </div>
  );
}
