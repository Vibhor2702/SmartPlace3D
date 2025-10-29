import { motion } from 'framer-motion';

function Controls({ onRotate, onScale, onDelete, onSnapshot, onExit }) {
  return (
    <div className="ar-controls">
      {/* Exit AR Mode */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onExit}
        className="control-button exit-button"
      >
        ❌ Exit AR
      </motion.button>

      {/* Control Panel */}
      <div className="control-panel">
        {/* Rotate */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onRotate}
          className="control-button icon-button"
          title="Rotate"
        >
          🔄
        </motion.button>

        {/* Scale Up */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onScale(0.1)}
          className="control-button icon-button"
          title="Scale Up"
        >
          ➕
        </motion.button>

        {/* Scale Down */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onScale(-0.1)}
          className="control-button icon-button"
          title="Scale Down"
        >
          ➖
        </motion.button>

        {/* Delete */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDelete}
          className="control-button icon-button delete"
          title="Delete"
        >
          🗑️
        </motion.button>

        {/* Snapshot */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onSnapshot}
          className="control-button icon-button snapshot"
          title="Take Snapshot"
        >
          📸
        </motion.button>
      </div>
    </div>
  );
}

export default Controls;
