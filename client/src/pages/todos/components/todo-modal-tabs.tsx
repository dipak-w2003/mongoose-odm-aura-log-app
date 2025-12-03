import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface ModalTabsProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  tabs: TabItem[];
}

const TodoModalTabs = ({
  isOpen,
  onClose,
  tabs,
  title = "Modal Demo",
}: ModalTabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[90%] max-w-lg p-5 rounded-2xl z-50
          bg-white/10 backdrop-blur-xl border border-white/20
          shadow-xl
        "
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center h-fit mb-4">
          <h2 className="text-white font-semibold text-md">{title}</h2>

          <button
            onClick={onClose}
            className="text-white bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg"
          >
            Close
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-xl text-sm font-semibold transition-all
                ${
                  activeTab === tab.id
                    ? "bg-white/30 text-white shadow"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            className=""
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tabs.find((t) => t.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default TodoModalTabs;
