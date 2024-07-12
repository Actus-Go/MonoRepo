export default function Bio({
  infos,
  handleChange,
  max,
  setShowBio,
  updateDetails,
  placeholder,
  name,
  detail,
  setShow,
  rel,
}) {
  return (
    <div className="add_bio_wrap text-gray-200">
      {rel ? (
        <select
          className="select_rel"
          name={name}
          value={infos.relationship}
          onChange={handleChange}
        >
          <option value="Single">Single</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          value={infos?.[name]}
          maxLength={detail ? 25 : 100}
          className="textarea_blue details_input border-[1px] border-gray-400/10 text-gray-200 font-bold"
          onChange={handleChange}
        ></textarea>
      )}
      {!detail && <div className="remaining font-bold"> <span className="text-[#6e56fc]">{max}</span> characters remaining</div>}
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon "></i>Public
        </div>
        <div className="flex flex_right">
          <button
            className="gray_btn bg-[#515151] text-white font-bold"
            onClick={() => (!detail ? setShowBio(false) : setShow(false))}
          >
            Cancel
          </button>
          <button
            className="blue_btn font-bold"
            onClick={() => {
              updateDetails();
              setShow(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
