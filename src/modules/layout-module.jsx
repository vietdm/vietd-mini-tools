import { IoArrowBack } from "react-icons/io5";

export const LayoutModule = ({ goHome, id, children }) => {
  return (
    <div id={id}>
      <div className="mb-2">
        <div className="flex items-center cursor-pointer" onClick={goHome}>
          <IoArrowBack />
          <span className="ml-2">Go Home</span>
        </div>
      </div>
      <div className="shadow-lg bg-[rgba(0,0,0,0.05)]">
        {children}
      </div>
    </div>
  )
}
