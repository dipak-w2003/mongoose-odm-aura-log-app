// dateConverter.ts
export type DateFormat =
  | "FULL_DATE"        // Thu Dec 04 2025
  | "TIME_ONLY"        // 12:00:00 PM
  | "DATE_TIME"        // Thu Dec 04 2025 12:00:00
  | "ISO"              // 2025-12-04T06:30:00.000Z
  | "UTC"              // Thu, 04 Dec 2025 06:30:00 GMT
  | "LOCAL_DATE"       // 12/4/2025
  | "LOCAL_TIME"       // 12:00:00 PM
  | "CUSTOM"           // user-defined format
  | "INPUT_DATE"
  | "INPUT_DATEx2"
interface CustomFormatOptions {
  year?: boolean;
  month?: boolean;
  day?: boolean;
  weekday?: boolean;
  hours?: boolean;
  minutes?: boolean;
  seconds?: boolean;
}

export function dateToString(
  date: Date = new Date(),
  format: DateFormat,
  strDate?: string,
  customOptions?: CustomFormatOptions
): string {
  switch (format) {
    case "FULL_DATE":
      return date.toDateString(); // Thu Dec 04 2025

    case "TIME_ONLY":
      return date.toLocaleTimeString(); // 12:00:00 PM

    case "DATE_TIME":
      return `${date.toDateString()} ${date.toLocaleTimeString()}`; // Thu Dec 04 2025 12:00:00 PM

    case "ISO":
      return date.toISOString(); // 2025-12-04T06:30:00.000Z

    case "UTC":
      return date.toUTCString(); // Thu, 04 Dec 2025 06:30:00 GMT

    case "LOCAL_DATE":
      return date.toLocaleDateString(); // 12/4/2025

    case "INPUT_DATE":
      // 04
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      // 12 (months are 0-indexed)
      // 2025
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;


    // "2025-12-04T06:30:00.000Z" to "2025-12-04" 
    case "INPUT_DATEx2":
      if (!strDate) return '';
      return strDate.split("T")[0];


    case "LOCAL_TIME":
      return date.toLocaleTimeString(); // 12:00:00 PM

    case "CUSTOM":
      if (!customOptions) return date.toString();
      const parts: string[] = [];

      if (customOptions.weekday) parts.push(date.toLocaleDateString(undefined, { weekday: "short" }));
      if (customOptions.day) parts.push(String(date.getDate()).padStart(2, "0"));
      if (customOptions.month) parts.push(date.toLocaleDateString(undefined, { month: "short" }));
      if (customOptions.year) parts.push(String(date.getFullYear()));

      let timeParts: string[] = [];
      if (customOptions.hours) timeParts.push(String(date.getHours()).padStart(2, "0"));
      if (customOptions.minutes) timeParts.push(String(date.getMinutes()).padStart(2, "0"));
      if (customOptions.seconds) timeParts.push(String(date.getSeconds()).padStart(2, "0"));

      return parts.join(" ") + (timeParts.length ? " " + timeParts.join(":") : "");

    default:
      return date.toString();
  }
}
