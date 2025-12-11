import PageWrapper from "../components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-gray-900 text-center">Home Page</h1>
      <p className="text-gray-600 mt-4 text-lg text-center">
        Welcome to the Task Manager application.
      </p>
    </PageWrapper>
  );
}
