const add_icon = ({color = "#999999", size = '48px'}) => `
<svg
  xmlns="http://www.w3.org/2000/svg"
  height="${size}"
  viewBox="0 -960 960 960"
  width="${size}"
  fill="${color}"
>
  <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
</svg>
`;

export default add_icon;