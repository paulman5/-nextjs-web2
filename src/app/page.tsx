import Link from "next/link";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NGaF1cXGFCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXZed3VURmRfVEZzVkQ="
);

export default function page() {
  return (
    <div className="relative">
      <Link href="/test"></Link>
    </div>
  );
}
