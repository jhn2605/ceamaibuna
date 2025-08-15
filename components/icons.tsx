import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  strokeWidth: 1.5,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};

export const SearchIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const StarIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
  </svg>
);

export const RestaurantIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

export const CarIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H3.375A2.25 2.25 0 001.125 6.75v10.5a1.125 1.125 0 001.125 1.125z" />
  </svg>
);

export const BeautyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className} >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.25a14.98 14.98 0 00-5.84 7.38m5.84 2.58a14.98 14.98 0 00-5.84 2.58m5.84-2.58v-4.8m0 4.8a14.98 14.98 0 005.84 2.58m-5.84-2.58l-6.16-12.12" />
    </svg>
);

export const ElectronicsIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
  </svg>
);

export const MapPinIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

export const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export const XMarkIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className} >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ArrowRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

export const ArrowLeftIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

export const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        className={className || "w-6 h-6 animate-spin"}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

export const UserIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

export const EnvelopeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

export const LockClosedIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

export const EyeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const EyeSlashIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const BriefcaseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.05a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-4.05m16.5-.75V9a2.25 2.25 0 00-2.25-2.25h-12A2.25 2.25 0 003.75 9v4.4m16.5 0v-2.25a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25v2.25m16.5 0h-16.5" />
    </svg>
);

export const ShieldCheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
    </svg>
);

export const UsersIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964A3 3 0 0012 15a3 3 0 00-1.059 5.84m-7.5 0a3 3 0 004.682-2.72m-4.682 2.72a3 3 0 01-3.741-.479m12-6.342a3 3 0 00-3-3a3 3 0 00-3 3.002v2.004a3 3 0 003 3a3 3 0 003-3v-2.004z" />
    </svg>
);

export const LightBulbIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a3 3 0 006 0 3 3 0 00-6 0zm0 0H9m3 5.25a3 3 0 01-3-3m3 3a3 3 0 003-3m-3 3h.008v.008H12v-.008zm-3 0h.008v.008H9v-.008zm0-9h.008v.008H9v-.008zm3 0h.008v.008H12v-.008z" />
    </svg>
);

export const BuildingOfficeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6" />
    </svg>
);

export const IdentificationIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-5.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zM12 18.75h8.25a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v11.25c0 1.242 1.008 2.25 2.25 2.25H12z" />
    </svg>
);

export const PhoneIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.211-.992-.58-1.353l-2.12-2.12-1.768 1.768a1.125 1.125 0 01-1.591 0l-5.657-5.657a1.125 1.125 0 010-1.591l1.768-1.768-2.121-2.121A1.125 1.125 0 006.318 4.5H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
);

export const GlobeAltIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c1.355 0 2.707-.157 4.008-.452M12 21c-1.355 0-2.707-.157-4.008-.452m16.536-4.498a9.004 9.004 0 00-17.072 0m17.072 0c.288-.632.468-1.306.468-2.008 0-4.968-4.032-9-9-9s-9 4.032-9 9c0 .702.18 1.376.468 2.008m16.104 0a8.967 8.967 0 01-16.104 0" />
    </svg>
);

export const ClockIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LinkIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);

export const CameraIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008v-.008z" />
    </svg>
);

export const WrenchScrewdriverIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 21.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75v-4.525a.75.75 0 00-.5-1.183l-1.558-.623a.75.75 0 01-.5-1.183V2.25a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75v11.492a.75.75 0 01-.5 1.183l-1.558.623a.75.75 0 00-.5 1.183v4.525z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75v-11.25a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75v11.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V8.25a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75v10.5z" />
    </svg>
);

export const HomeModernIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h4.5m0 0V3.545M2.25 21V10.75M15 21V3.545" />
    </svg>
);

export const CalendarDaysIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
    </svg>
);

export const ScaleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-19.5 0c1.01.143 2.01.317 3 .52m13.5 0A48.458 48.458 0 0112 9c-2.291 0-4.545-.16-6.75-.47m13.5 0c1.01-.143 2.01-.317 3-.52m-19.5 0c1.01-.143 2.01-.317 3-.52" />
    </svg>
);

export const GoogleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        <path d="M1 1h22v22H1z" fill="none"/>
    </svg>
);

export const HeartIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

export const HeartIconFilled: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className} fill="currentColor" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);


export const AcademicCapIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5M5.25 4.5l7.5-3 7.5 3M5.25 21V4.5" />
    </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.502L16.5 21.75l-.398-1.248a3.375 3.375 0 00-2.455-2.456L12.75 18l1.248-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.248a3.375 3.375 0 002.456 2.456l1.248.398-1.248.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

export const ComputerDesktopIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className} >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
);

export const DumbbellIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className} stroke="none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.31,10.33,18,11.56V6h2.5A1.5,1.5,0,0,0,22,4.5,1.5,1.5,0,0,0,20.5,3H18V2.5A1.5,1.5,0,0,0,16.5,1,1.5,1.5,0,0,0,15,2.5V3H9V2.5A1.5,1.5,0,0,0,7.5,1,1.5,1.5,0,0,0,6,2.5V3H3.5A1.5,1.5,0,0,0,2,4.5,1.5,1.5,0,0,0,3.5,6H6v5.56L2.69,10.33a1.49,1.49,0,0,0-1.2,1.2,1.52,1.52,0,0,0,.6,1.4,1.5,1.5,0,0,0,1.4.6l3.51-1.25,1.25,3.51a1.5,1.5,0,0,0,1.4.6,1.52,1.52,0,0,0,1.4-.6,1.49,1.49,0,0,0,.6-1.4l-1.25-3.51,3.51,1.25a1.5,1.5,0,0,0,1.4-.6,1.52,1.52,0,0,0,.6-1.4A1.49,1.49,0,0,0,21.31,10.33Z" />
        <path d="M6,13.44,2.69,14.67a1.49,1.49,0,0,0-1.2-1.2,1.52,1.52,0,0,0-.6,1.4,1.5,1.5,0,0,0,1.4.6L6,14.2V18H3.5A1.5,1.5,0,0,0,2,19.5,1.5,1.5,0,0,0,3.5,21H6v.5A1.5,1.5,0,0,0,7.5,23,1.5,1.5,0,0,0,9,21.5V21h6v.5A1.5,1.5,0,0,0,16.5,23,1.5,1.5,0,0,0,18,21.5V21h2.5A1.5,1.5,0,0,0,22,19.5,1.5,1.5,0,0,0,20.5,18H18V14.2l3.31.78a1.5,1.5,0,0,0,1.4-.6,1.52,1.52,0,0,0,.6-1.4,1.49,1.49,0,0,0-1.2-1.2Z" />
    </svg>
);

export const PawIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className} viewBox="0 0 24 24">
        <path fill="currentColor" stroke="none" d="M14.6,3.33a2.4,2.4,0,1,0,2.07,2.07A2.4,2.4,0,0,0,14.6,3.33Zm-5.2,0a2.4,2.4,0,1,0,2.07,2.07A2.4,2.4,0,0,0,9.4,3.33Zm-5,3.9a2.4,2.4,0,1,0,2.07,2.07A2.4,2.4,0,0,0,4.4,7.23Zm15.2,0a2.4,2.4,0,1,0,2.07,2.07A2.4,2.4,0,0,0,19.6,7.23ZM12,8.43a4.8,4.8,0,0,0-4.7,4c-2.3,1-4.1,3.3-4.1,6.3,0,1,1.1,1.2,1.6,.2a3.6,3.6,0,0,1,6.8,0c.5,1,1.6,.8,1.6-.2,0-3-1.8-5.3-4.1-6.3A4.7,4.7,0,0,0,12,8.43Z" />
    </svg>
);


export const TruckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path d="M15.5 14.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zM5.5 14.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" strokeWidth="0" fill="currentColor" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-16.5 3h16.5M3.75 12h16.5m-16.5 3.75h16.5M6.75 21v-3.75m10.5 3.75v-3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.75L.75 12l5.25 5.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 6.75V3.75a2.25 2.25 0 0 0-2.25-2.25h-13.5A2.25 2.25 0 0 0 3 3.75v16.5" />
    </svg>
);

export const ViewfinderCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0-4.968-4.032-9-9-9s-9 4.032-9 9c0 4.968 4.032 9 9 9s9-4.032 9-9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 3v1m0 16v1m-8-9H3m16 0h-1" />
    </svg>
);

export const RouteIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className} >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.004l-3.375-3.375m-3.375 0l3.375 3.375m-3.375-3.375L6.75 11.25m3.375 3.375l3.375-3.375M16.5 4.5l-3.375 3.375m3.375 0l-3.375-3.375m3.375 0L19.5 7.875m-3.375-3.375l3.375 3.375" />
    </svg>
);

export const ArrowUpIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
    </svg>
);

export const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export const HistoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const DocumentMagnifyingGlassIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25l-2.063-2.063m0 0A5.25 5.25 0 1011.25 6a5.25 5.25 0 006.188 8.188zM4.5 1.5V15a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25V5.25m-9 0A2.25 2.25 0 009 3V1.5H4.5z" />
    </svg>
);

export const ShareIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.186 2.25 2.25 0 00-3.933 2.186z" />
    </svg>
);

export const SunIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

export const MoonIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75 2.572 0 4.921-.996 6.752-2.648z" />
  </svg>
);

export const TrashIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

// START: New Icons
export const CakeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.75c-1.125 1.125-2.625 1.5-4.125 1.5s-3-.375-4.125-1.5m8.25 0c.375-3-1.5-6.375-4.125-6.375S5.625 9.75 6 12.75m12.375 0v6.75a2.25 2.25 0 01-2.25 2.25h-8.25a2.25 2.25 0 01-2.25-2.25v-6.75m12.375 0h-1.5m-9.375 0h1.5m6.375 0h-3.375" />
  </svg>
);

export const CoffeeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 16.5h8.25c.621 0 1.125-.504 1.125-1.125v-3.75c0-.621-.504-1.125-1.125-1.125H10.5m0 6h-5.25c-.621 0-1.125-.504-1.125-1.125v-3.75c0-.621.504-1.125 1.125-1.125H10.5m0 6V4.5m5.25 12v-6.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 6.75h.75v.75H7.5V6.75zm3 0h.75v.75H10.5V6.75zm3 0h.75v.75H13.5V6.75z" />
  </svg>
);

export const CocktailIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M12 21a2.25 2.25 0 01-2.25-2.25H6.375A2.25 2.25 0 014.125 21M12 21a2.25 2.25 0 002.25-2.25h3.375A2.25 2.25 0 0019.875 21M4.125 4.5L12 12.75l7.875-8.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 4.5h17.25" />
  </svg>
);

export const PlateIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
    </svg>
);

export const BuildingStorefrontIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V11.25m0-1.125V3M21 11.25v8.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19.5V11.25m18 0a9 9 0 10-18 0" />
    </svg>
);

export const ToothIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25c-2.485 0-4.5 2.015-4.5 4.5 0 1.21.467 2.316 1.235 3.165l-3.235 5.61a.75.75 0 01-1.265-.73l3.11-5.385a4.471 4.471 0 01-1.145-3.16C13.5 7.265 11.485 5.25 9 5.25s-4.5 2.015-4.5 4.5c0 1.15.433 2.215 1.145 3.045l3.11 5.385a.75.75 0 01-1.265.73l-3.235-5.61C4.967 11.946 4.5 10.84 4.5 9.75c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 .32-.03.635-.088.94" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.75c0 2.485-2.015 4.5-4.5 4.5S6 12.235 6 9.75 8.015 5.25 10.5 5.25s4.5 2.015 4.5 4.5z" />
  </svg>
);

export const PillBottleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75h10.5a.75.75 0 01.75.75v15a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75v-15a.75.75 0 01.75-.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12M9 9h6m-3 3h.01" />
  </svg>
);

export const UserGroupIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964A3 3 0 0012 15a3 3 0 00-1.059 5.84m-7.5 0a3 3 0 004.682-2.72m-4.682 2.72a3 3 0 01-3.741-.479M12 12.75a3 3 0 00-3-3a3 3 0 00-3 3.002v2.004a3 3 0 003 3a3 3 0 003-3v-2.004z" />
    </svg>
);

export const GlassesIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM7.5 6.75h9M7.5 12H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125H7.5m9-3.75h4.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H16.5" />
  </svg>
);

export const SpaIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a5.25 5.25 0 015.25 5.25c0 3.32-2.35 6.405-5.25 8.25-2.9-1.845-5.25-4.93-5.25-8.25A5.25 5.25 0 0112 6.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);

export const ScissorsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM16.5 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12 12L7.5 3.75m4.5 8.25L16.5 3.75M12 12v9" />
    </svg>
);

export const PaintBrushIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

export const KeyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
);

export const SteeringWheelIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM12 12v6.75m0-11.25V3M3.375 12h5.25m6.75 0h5.25" />
    </svg>
);

export const TireIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 15.91a5.25 5.25 0 01-7.82 0m7.82 0a5.25 5.25 0 00-7.82 0m7.82-7.82a5.25 5.25 0 00-7.82 0m7.82 0a5.25 5.25 0 01-7.82 0" />
    </svg>
);

export const CarWashIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H3.375A2.25 2.25 0 001.125 6.75v10.5a1.125 1.125 0 001.125 1.125z" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75c1.5 2 1.5 5 0 7.5 M9 3.75c1.5 2 1.5 5 0 7.5 M12 3.75c1.5 2 1.5 5 0 7.5" />
    </svg>
);

export const WrenchIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 8.25l-4.5 4.5m0 0l-1.5-1.5m1.5 1.5l1.5-1.5m4.5 1.5l-1.5-1.5m1.5 1.5l1.5-1.5m-6.75-3.75l-1.5-1.5m1.5 1.5l1.5-1.5m6 6l-1.5-1.5m1.5 1.5l1.5-1.5m-6-3.75l-1.5-1.5m1.5 1.5l1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 21a8.25 8.25 0 006.51-3.26c.46-.61.6-1.393.41-2.138l-3.32-9.96a.75.75 0 00-1.42.472l3.32 9.96a.75.75 0 01-.41 1.056c-1.57.8-3.344 1.14-5.116.892a.75.75 0 00-.629.283L8.25 21" />
    </svg>
);

export const GardeningIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a2.25 2.25 0 002.25-2.25v-1.5a2.25 2.25 0 00-4.5 0v1.5A2.25 2.25 0 0012 21zM12 3c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5S14.485 3 12 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-1.84 0-3.5.76-4.72 2M16.72 14c-1.22-.76-2.88-2-4.72-2" />
    </svg>
);

export const CalculatorIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-4.5-2.25V18m-4.5-2.25V18M9 9.75h6.75M15 3H9a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 009 21h6a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0015 3z" />
    </svg>
);

export const MegaphoneIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);

export const ChartBarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

export const LanguageIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.363 13.5 8.309 13.5 9.375c0 1.933-.863 3.68-2.18 4.893l-3.32 3.32c-.527.527-1.433.41-2.028-.283A11.975 11.975 0 012.25 9.375c0-1.066.318-2.097.878-2.95" />
    </svg>
);

export const BookOpenIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const GiftIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.375c-.621 0-1.125.504-1.125 1.125s.504 1.125 1.125 1.125h.008c.621 0 1.125-.504 1.125-1.125s-.504-1.125-1.125-1.125H12.75zM11.25 3.375c-.621 0-1.125.504-1.125 1.125s.504 1.125 1.125 1.125h.008c.621 0 1.125-.504 1.125-1.125s-.504-1.125-1.125-1.125H11.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-6.375c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125V21M9.875 13.5H12v7.5M12 13.5H9.875m1.125 0H12m0 0H9.875m2.25 0h1.5m-3.75 0h1.5m-1.5 0h1.5m0 0v-6.375c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125V21" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 10.5h17.25c.621 0 1.125.504 1.125 1.125v6c0 .621-.504 1.125-1.125 1.125H3.375A1.125 1.125 0 012.25 17.625v-6c0-.621.504-1.125 1.125-1.125z" />
    </svg>
);

export const FlowerIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 009-9c0-4.968-4.032-9-9-9s-9 4.032-9 9a9 9 0 009 9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m0-15.75c-2.485 0-4.5 2.015-4.5 4.5S9.515 12 12 12s4.5-2.015 4.5-4.5S14.485 3 12 3zm0 9c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5S14.485 12 12 12z" />
    </svg>
);

export const TshirtIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3.75m0 0a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM12 6.75a3.75 3.75 0 107.5 0 3.75 3.75 0 00-7.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75v6a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25v-6" />
    </svg>
);

export const PhoneWrenchIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.211-.992-.58-1.353l-2.12-2.12-1.768 1.768a1.125 1.125 0 01-1.591 0l-5.657-5.657a1.125 1.125 0 010-1.591l1.768-1.768-2.121-2.121A1.125 1.125 0 006.318 4.5H4.5A2.25 2.25 0 002.25 6.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0-4.5v.01" />
    </svg>
);
// END: New Icons