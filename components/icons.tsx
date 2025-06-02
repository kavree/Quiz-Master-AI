import React from 'react';

export const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-5.602M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0-1.314 1.002-2.37 2.25-2.37.99 0 1.842.594 2.168 1.429M9.75 11.25c0 .775.468 1.449 1.149 1.816M9.75 12.75c0 .561.273 1.074.71 1.437M7.5 14.25A2.238 2.238 0 009.75 12c.309 0 .61.048.9.142M3.75 12.651A15.083 15.083 0 003 15V18a1.5 1.5 0 001.5 1.5h15A1.5 1.5 0 0021 18v-3.024a15.083 15.083 0 00-.772-2.326M15.75 9.75a3.713 3.713 0 01-1.404 2.888" />
  </svg>
);

// Updated BrainIcon to be more thematic
export const BrainIcon: React.FC<{ className?: string; strokeWidth?: number }> = ({ className, strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.75c0 .906.263 1.747.714 2.453m0 0A5.963 5.963 0 0112 15.75c.416 0 .821-.057 1.207-.163m2.579-1.336A5.961 5.961 0 0115.5 12.75m0 0c0-.906-.263-1.747-.714-2.453A5.962 5.962 0 0012 9.75c-.416 0-.821.057-1.207.163m-2.579 1.336A5.961 5.961 0 009.5 12.75M5.25 6.375c0 .906.263 1.747.714 2.453M12 3.75c.416 0 .821.057 1.207.163m2.579 1.336c.451.706.714 1.547.714 2.453m0 0c0 .906-.263 1.747-.714 2.453M18.75 6.375c0 .906-.263 1.747-.714 2.453M12 20.25c-.416 0-.821-.057-1.207-.163M8.293 18.937A5.962 5.962 0 016.5 15.25m0 0c0-.906.263-1.747.714-2.453M3.75 15.25c0 .906.263 1.747.714 2.453M12 3.75a9 9 0 019 9h-3.375M12 3.75a9 9 0 00-9 9h3.375M12 20.25a9 9 0 01-9-9H5.625M12 20.25a9 9 0 009-9h-3.375" />
  </svg>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a3.375 3.375 0 01-3 0m3-1.121c1.28-.577 1.63-2.423 1.06-3.536a7.473 7.473 0 00-8.12 0c-.57.11-.94-.31-.94-.833V9.75c0-.636.37-1.2.94-1.41M12 3c2.404 0 4.547 1.15 5.842 3H6.158C7.453 4.15 9.596 3 12 3z" />
  </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5A3.375 3.375 0 0012.75 9.75H11.25A3.375 3.375 0 007.5 13.125v5.625m9 0H7.5M12 6.375A3.375 3.375 0 1112 13.125a3.375 3.375 0 010-6.75zM12 6.375V3.75m0 2.625V3.75m0 2.625a3.375 3.375 0 110 6.75m0-6.75V3.75M5.625 9.75A2.625 2.625 0 018.25 7.125H15.75a2.625 2.625 0 012.625 2.625" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.125V18.75" />
 </svg>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.19.025.383.042.578.052m0 0c.685.093 1.39.132 2.106.132m3.315-3.315a2.25 2.25 0 00-2.186 0M8.353 7.217c.025-.19.042-.383.052-.578m0 0c.093-.685.132-1.39.132-2.106M15.783 13.093a2.25 2.25 0 000-2.186m0 2.186c-.19-.025-.383-.042-.578-.052m0 0c-.685-.093-1.39-.132-2.106-.132M10.783 21.25c.19.025.383.042.578.052.685.093 1.39.132 2.106.132m-3.315 3.315a2.25 2.25 0 002.186 0m1.13-14.633c-.025.19-.042.383-.052.578m0 0c-.093.685-.132 1.39-.132 2.106m0 0a2.25 2.25 0 002.186 0M13.647 4.783c.025.19.042.383.052.578m0 0c.093.685.132 1.39.132 2.106" />
 </svg>
);

// Icon for "Back to Home" or general home navigation
export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.954 8.955M3.75 10.5V21a.75.75 0 00.75.75H9v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21h4.5a.75.75 0 00.75-.75V10.5M21.75 12l-9.75-9.75L2.25 12" />
  </svg>
);