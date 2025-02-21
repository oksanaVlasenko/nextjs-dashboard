export default function StepHeader({ header, text }: { header: string, text: string }) {
  return (
    <>
      <h3 className="font-heading mb-0.5 text-lg font-semibold">
        {header}
      </h3>
      <p className="mb-7 text-neutral-500">
        {text}
      </p>
    </>
  )
}