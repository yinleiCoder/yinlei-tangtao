import Breadcrumb from "../components/Breadcrumb";

export default function ProjectLayout({ children }) {
  return (
    <>
      <Breadcrumb />
      {children}
    </>
  );
}
