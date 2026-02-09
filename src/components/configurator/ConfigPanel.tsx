import { motion } from 'framer-motion';
import { useGarageStore } from '../../stores/garageStore';
import { useSound } from '../../hooks/useSound';
import { car } from '../../data/cars';
import { ColorPicker } from './ColorPicker';

/**
 * Elegant configurator panel for the GT3 RS.
 * Displayed inside the slide-in drawer. Minimal, premium styling.
 */

function OptionGroup<T extends { id: string; name: string; price: number }>({
  label,
  options,
  selectedId,
  onSelect,
  renderExtra,
}: {
  label: string;
  options: T[];
  selectedId: string;
  onSelect: (id: string) => void;
  renderExtra?: (opt: T) => React.ReactNode;
}) {
  const { playTick } = useSound();

  return (
    <div>
      <h4 className="text-[9px] tracking-[0.25em] text-white/25 uppercase mb-3">
        {label}
      </h4>
      <div className="space-y-1" role="radiogroup" aria-label={label}>
        {options.map((opt) => {
          const isSelected = opt.id === selectedId;
          return (
            <button
              key={opt.id}
              onClick={() => { onSelect(opt.id); playTick(); }}
              className={`
                w-full text-left px-3 py-2.5 rounded text-[12px] transition-all duration-300
                flex items-center justify-between
                ${isSelected
                  ? 'bg-white/8 text-white/90'
                  : 'text-white/35 hover:text-white/60 hover:bg-white/3'}
              `}
              role="radio"
              aria-checked={isSelected}
            >
              <div className="flex items-center gap-2.5">
                {/* Minimal indicator */}
                <div className={`w-1 h-1 rounded-full transition-all duration-300
                  ${isSelected ? 'bg-white/70' : 'bg-white/10'}`}
                />
                <span className="font-light tracking-wide">{opt.name}</span>
                {renderExtra?.(opt)}
              </div>
              <span className="text-[10px] text-white/20 font-light">
                {opt.price > 0 ? `+$${opt.price.toLocaleString()}` : ''}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ConfigPanel() {
  const {
    selectedWheelId,
    setWheel,
    selectedInteriorId,
    setInterior,
    selectedPerformanceId,
    setPerformance,
    selectedAeroId,
    setAero,
    getTotalPrice,
  } = useGarageStore();
  const totalPrice = getTotalPrice();

  return (
    <div className="space-y-8">
      {/* Total price — prominent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pb-6 border-b border-white/6"
      >
        <p className="text-[8px] tracking-[0.3em] text-white/20 uppercase mb-1">Total Price</p>
        <p className="text-2xl font-extralight tracking-wide text-gold">
          ${totalPrice.toLocaleString()}
        </p>
      </motion.div>

      {/* Color picker */}
      <ColorPicker />

      {/* Wheels */}
      <OptionGroup
        label="Wheels"
        options={car.wheels}
        selectedId={selectedWheelId}
        onSelect={setWheel}
      />

      {/* Interior */}
      <OptionGroup
        label="Interior"
        options={car.interiors}
        selectedId={selectedInteriorId}
        onSelect={setInterior}
        renderExtra={(opt) => (
          <div
            className="w-2.5 h-2.5 rounded-full ml-1"
            style={{ backgroundColor: opt.color, border: '1px solid rgba(255,255,255,0.1)' }}
          />
        )}
      />

      {/* Performance */}
      <OptionGroup
        label="Performance"
        options={car.performancePackages}
        selectedId={selectedPerformanceId}
        onSelect={setPerformance}
      />

      {/* Aero */}
      <OptionGroup
        label="Aerodynamics"
        options={car.aeroKits}
        selectedId={selectedAeroId}
        onSelect={setAero}
      />
    </div>
  );
}
