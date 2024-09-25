export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="flex h-screen flex-col items-center">{children}</div>
}
