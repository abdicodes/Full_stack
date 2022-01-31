const Persons = ({ contacts }) => {
  return (
    <div>
      {contacts.map((e, i) => (
        <div key={i}>
          {e.name} {e.number}
        </div>
      ))}
    </div>
  );
};
export default Persons;
