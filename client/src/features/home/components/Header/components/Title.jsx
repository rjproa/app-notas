export default function Title({ userName }) {
  const getFirstName = (fullName) => {
    return fullName ? fullName.split(' ')[0] : 'Usuario';
  };

  return (
    <div className="flex items-center">
      <h1 className="font-bold text-[#1C5A33]">
        <p className="text-xl md:text-2xl">
          Hola,</p>
        <p className="text-xl md:text-4xl">
          {getFirstName(userName)}
        </p>
      </h1>
    </div>
  )
}