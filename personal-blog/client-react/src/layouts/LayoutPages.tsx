export default function LayoutPages({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Standard page styles */}
      <main>{children}</main>
    </>
  );
}
