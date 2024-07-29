import { DarkMode, Gradient, LightMode } from '@/components/Icon'

export function CrashIcon({ id, color }) {
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
          id="Stickers"
          stroke="none"
          strokeWidth={1}
          fill="none"
          fillRule="evenodd"
        >
          <g transform="translate(1, 1)">
            <path
              d="M15.7511536,2.73193271 L16.4272957,6.15865275 L19.3224722,7.95332142 L22.806314,6.75665932 L24.5923937,9.87956896 L21.9805599,12.3507547 L21.938219,15.563982 L24.5679039,17.9385068 L22.9341704,21.0403918 L19.418015,20.1081931 L16.4865921,21.6714003 L15.8623808,25.1630802 L12.1994224,25.2522194 L11.456731,21.7584969 L8.73567489,20.1124345 L5.24107888,21.5027662 L3.33381325,18.084251 L6.05818608,15.6571453 L6.10353205,12.4381955 L3.36205517,10.0164213 L5.10094567,6.80719455 L8.64021327,7.96162611 L11.4058823,6.24014753 L12.0870573,2.81880965 L15.7511536,2.73193271 Z M13.671501,7.41116494 L8.05320116,17.6910755 L20.2769099,17.1031202 L13.671501,7.41116494 Z"
              stroke={`url(#${id}-gradient-dark-1)`}
              strokeWidth="0.517474378"
              fill={`url(#${id}-gradient-dark-1)`}
            />
            <g id="Group-22" transform="translate(13.4017, 10.1709)">
              <path
                d="M0.538461538,0 C0.538461538,2.27019879 0.538461538,3.47911962 0.538461538,3.62676249"
                stroke={`url(#${id}-gradient-dark-1)`}
                strokeLinecap="round"
              />
              <circle
                fill={`url(#${id}-gradient-dark-1)`}
                cx="0.538461538"
                cy="5.08547009"
                r={1}
              />
            </g>
            <path
              d="M8.58834992,1.07692308 C3.54344006,3.19381462 0,8.18107497 0,13.9961761 C0,21.7302745 6.2680135,28 14,28 M19.1322213,27.042735 C24.3252271,24.9945752 28,19.9300983 28,14.0069086 C28,6.27110659 21.7319865,0 14,0"
              stroke={`url(#${id}-gradient-dark-1)`}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <path
              d="M7.15393571,0.885523749 L8.52929882,0.800186417 C8.54241496,0.799372599 8.55370741,0.809345594 8.55452123,0.822461726 C8.55463476,0.824291455 8.55453645,0.826128175 8.55422827,0.827935333 L8.32389744,2.17856946 L8.32389744,2.17856946"
              stroke={`url(#${id}-gradient-dark-1)`}
              strokeWidth={2}
              strokeLinecap="round"
              transform="translate(7.8566, 1.4884) rotate(-349) translate(-7.8566, -1.4884)"
            />
            <path
              d="M18.8804314,26.133387 L20.2557946,26.0480497 C20.2689107,26.0472358 20.2802031,26.0572088 20.281017,26.070325 C20.2811305,26.0721547 20.2810322,26.0739914 20.280724,26.0757986 L20.0503932,27.4264327 L20.0503932,27.4264327"
              stroke={`url(#${id}-gradient-dark-1)`}
              strokeWidth={2}
              strokeLinecap="round"
              transform="translate(19.5831, 26.7363) rotate(-165) translate(-19.5831, -26.7363)"
            />
          </g>
        </g>
      </DarkMode>
    </>
  )
}
