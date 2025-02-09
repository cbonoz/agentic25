import QRPageContent from '@/components/qr-page-content';
import NavBar from '@/components/nav-bar';

export default function QRPage() {
  return (
    <>
      <NavBar hideLaunchAndAbout={true} />
      <QRPageContent />
    </>
  );
}
