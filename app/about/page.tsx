export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-8 text-left">
      <h1 className="text-3xl font-bold mb-4">Short Explanation video</h1>
      <p className="text-lg mb-2">Micky Malvino Kusandiwinata - 22586472</p>
      <div className="w-full max-w-2xl aspect-video mb-6">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/nRHrWIZ_1cs"
          title="Project Demonstration Video"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
