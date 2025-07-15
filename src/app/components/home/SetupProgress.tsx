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
    <div className={`${styles.cardBox}`}>
      <h2 className="mb-3 uppercase ">Start Accepting Orders</h2>
      <hr className=" border-[1px] my-4 w-92" />
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8 `}>
        {steps.map((step, idx) => (
          <div key={idx}>
            <div className={styles.step}>
              <i>
                <FontAwesomeIcon
                  icon={step.done ? faCheckCircle : faCircle}
                  className={step.done ? "text-success" : "text-muted"}
                />
              </i>
              <div className="space-y-2">
                <h2 className="!text-[#333843]">{`${idx + 1}. ${
                  step.title
                }`}</h2>
                <p className={styles.textMuted}>{step.desc}</p>
                <button className="btn btn-outline-primary btn-sm">
                  {step.btn}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetupProgress;
