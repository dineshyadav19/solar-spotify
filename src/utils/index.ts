import html2canvas from "html2canvas";

export function convertHtmlToImage(props: { site_id: string; mobile: string }) {
  const element = document.querySelector(`#solar-${props.site_id}`) as HTMLElement | null;;

  if (element) {
    html2canvas(element).then((canvas) => {
      let anchorTag = document.createElement("a");
      document.body.appendChild(anchorTag);
      anchorTag.download = `${props.mobile}.jpg`;
      anchorTag.href = canvas.toDataURL();
      anchorTag.target = "_blank";
      anchorTag.click();
      document.body.removeChild(anchorTag);
    });
  } else {
    console.error(`Element with ID solar-${props.site_id} not found.`);
  }
}


export const processCSV = (
  str: string,
  delim: string = ","
): { [key: string]: string }[] => {
  const headers = str.slice(0, str.indexOf("\n")).split(delim);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const newArray = rows.map((row) => {
    const values = row.split(delim);
    const eachObject = headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {} as { [key: string]: string });
    return eachObject;
  });

  return newArray;
};
