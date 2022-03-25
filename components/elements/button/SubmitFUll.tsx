export default function SubmitFull({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="btn-pri w-full px-4 py-2 tracking-wide"
    >
      {text}
    </button>
  );
}
