import { DarkMode, Gradient, LightMode } from '@/components/Icon'

export function MiddlewareIcon({ id, color }) {
  return (
    <>
      <defs>
        <Gradient
          id={`${id}-gradient`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 20 11)"
        />
        <Gradient
          id={`${id}-gradient-dark-1`}
          color={color}
          gradientTransform="matrix(0 22.75 -22.75 0 16 6.25)"
        />
        <Gradient
          id={`${id}-gradient-dark-2`}
          color={color}
          gradientTransform="matrix(0 14 -14 0 16 10)"
        />
      </defs>
      <LightMode>
        <circle cx={20} cy={20} r={12} fill={`url(#${id}-gradient)`} />
        <g
          fillOpacity={0.5}
          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9v14l12 6V15L3 9Z" />
          <path d="M27 9v14l-12 6V15l12-6Z" />
        </g>
        <path
          d="M11 4h8v2l6 3-10 6L5 9l6-3V4Z"
          fillOpacity={0.5}
          className="fill-[var(--icon-background)]"
        />
        <g
          className="stroke-[color:var(--icon-foreground)]"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 5.5 27 9l-12 6L3 9l7-3.5" />
          <path d="M20 5c0 1.105-2.239 2-5 2s-5-.895-5-2m10 0c0-1.105-2.239-2-5-2s-5 .895-5 2m10 0v3c0 1.105-2.239 2-5 2s-5-.895-5-2V5" />
        </g>
      </LightMode>
      <DarkMode strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <g
          id="Coupons"
          stroke="none"
          strokeWidth={1}
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Group-8"
            transform="translate(1.886, 0.5708)"
            fill={`url(#${id}-gradient-dark-1)`}
            fillRule="nonzero"
          >
            <path
              d="M15.9862254,-0.537037 C16.5589651,-0.537037 17.0232624,-0.0727397201 17.0232624,0.5 C17.0232624,1.07273972 16.5589651,1.537037 15.9862254,1.537037 L-4.4408921e-16,1.537037 C-0.57273972,1.537037 -1.037037,1.07273972 -1.037037,0.5 C-1.037037,-0.0727397201 -0.57273972,-0.537037 -4.4408921e-16,-0.537037 L15.9862254,-0.537037 Z"
              id="Path-2"
            />
            <path
              d="M15.9862254,6.462963 C16.5589651,6.462963 17.0232624,6.92726028 17.0232624,7.5 C17.0232624,8.07273972 16.5589651,8.537037 15.9862254,8.537037 L-4.4408921e-16,8.537037 C-0.57273972,8.537037 -1.037037,8.07273972 -1.037037,7.5 C-1.037037,6.92726028 -0.57273972,6.462963 -4.4408921e-16,6.462963 L15.9862254,6.462963 Z"
              id="Path-2-Copy"
            />
            <path
              d="M15.9862254,13.462963 C16.5589651,13.462963 17.0232624,13.9272603 17.0232624,14.5 C17.0232624,15.0727397 16.5589651,15.537037 15.9862254,15.537037 L-4.4408921e-16,15.537037 C-0.57273972,15.537037 -1.037037,15.0727397 -1.037037,14.5 C-1.037037,13.9272603 -0.57273972,13.462963 -4.4408921e-16,13.462963 L15.9862254,13.462963 Z"
              id="Path-2-Copy-2"
            />
          </g>
        </g>
      </DarkMode>
    </>
  )
}
