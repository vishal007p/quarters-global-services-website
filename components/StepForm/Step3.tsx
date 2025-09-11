type Props = {
  data: any;
};

const Step3 = ({ data }: Props) => {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
      <p>Your application has been submitted successfully.</p>
      <pre className="bg-gray-100 p-4 rounded mt-6 text-left">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Step3;
