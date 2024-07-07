import { white } from "../../constants/colors";

const close_icon = ({color = "#999999", size = '48px'}) => `
<svg
  xmlns="http://www.w3.org/2000/svg"
  height='${size}'
  viewBox="0 -960 960 960"
  width='${size}'
  fill="${color}"
>
  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
</svg>
`;

export default close_icon