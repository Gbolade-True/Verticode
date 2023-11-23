import IPerson from "../../models/Person";

interface IPersonCardProps {
  person: IPerson;
  onClose?: () => void;
}

export const PersonCard = ({ person, onClose }: IPersonCardProps) => {
  const { firstName, lastName, dateOfBirth, job, bio, location, estimatedScore } = person;

  return (
    <div className="relative w-full md:w-[480px] mx-auto bg-light-green-50 text-green-800 p-8 rounded-md shadow-md">
      {onClose ?
        <button
        className="absolute top-4 right-4 text-green-800 hover:text-green-600"
        onClick={onClose}
      >
        Edit
      </button>
      : null}
      <div className="mb-4">
        <h4 className="text-xl font-semibold my-4">{`${firstName} ${lastName}`}</h4>
        <p className="text-sm">{`Date of Birth: ${new Date(dateOfBirth).toLocaleDateString()}`}</p>
        <p className="text-sm">{`Job: ${job}`}</p>
      </div>
      <hr className="my-4 border-t border-green-300" />
      <div className="mb-4">
        <p className="text-sm">{`Location: ${location.city}, ${location.country}`}</p>
        <p className="text-sm">{`${location.lat}, ${location.long}`}</p>
      </div>
      <hr className="my-4 border-t border-green-300" />
      <div className="mb-4">
        <p className="m-0">Bio:</p>
        <p className="text-base">{`${bio}`}</p>
      </div>
      <hr className="my-4 border-t border-green-300" />
      <div className="flex justify-between items-center">
        <p className="text-sm">{`Estimated Score: ${estimatedScore}`}</p>
      </div>
    </div>
  );
};
