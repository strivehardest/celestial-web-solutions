export default function Redirect() { return null; }

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/web-design-company-in-ghana/web-development-company-in-ghana',
      permanent: true,
    },
  };
}
