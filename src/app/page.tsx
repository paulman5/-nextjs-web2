import Link from "next/link";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "ORg4AjUWIQA/Gnt2VlhhQlJCfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5adEVjXXpfcHFXQ2ld"
);

export default function page() {
  return (
    <div className="relative">
      <Link href="/test"></Link>
    </div>
  );
}
