import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    title: "Add Products",
    desc: "Keep adding products to your store.",
    btn: "Add products",
    done: true,
  },
  {
    title: "Shipping configured",
    desc: "Modify your rates or add new shipping regions.",
    btn: "Shipping settings",
    done: true,
  },
  {
    title: "Payments configured",
    desc: "Customers can make purchases and you will receive payouts.",
    btn: "Payment settings",
    done: true,
  },
  {
    title: "Set up your tax rates",
    desc: "Automatically calculate taxes at checkout.",
    btn: "Set up taxes",
    done: false,
  },
];

const SetupProgress = () => {
  return (
    <div>
      <h1 className="my-5">
        Get started guides
      </h1>
      <div className={`${styles.cardBox}`}>
        <h2 className="mb-3 uppercase ">Start Accepting Orders</h2>
        <hr className=" border-[1px] my-4 w-92" />
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8 `}>
          {steps.map((step, idx) => (
            <div key={idx} className="flex">
              {/* Timeline Line + Icon */}
              <div className="flex flex-col items-center mr-4 w-11">
                <FontAwesomeIcon
                  icon={step.done ? faCheckCircle : faCircle}
                  className={`text-lg ${
                    step.done ? "text-green-600" : "text-gray-300 "
                  }`}
                />
                {/* Show vertical line unless last item in its column */}
                {(idx < 2 || (idx >= 2 && idx < steps.length - 1)) && (
                  <div className="w-px bg-gray-300 h-full mt-1"></div>
                )}
              </div>

              {/* Content */}
              <div className="mb-6 space-y-2">
                <h3 className="!text-2xl font-medium text-gray-800">{`${
                  idx + 1
                }. ${step.title}`}</h3>
                <p className="!font-medium  !text-gray-500">{step.desc}</p>
                <button className="btn-outline-primary">{step.btn}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetupProgress;
