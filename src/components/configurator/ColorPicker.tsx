import { useGarageStore } from '../../stores/garageStore';
import { useSound } from '../../hooks/useSound';
import { car } from '../../data/cars';

/**
 * Refined color picker with larger swatches and minimal selected state.
 */
export function ColorPicker() {
  const { selectedColorId, setColor } = useGarageStore();
  const { playTick } = useSound();

  const selectedColor = car.colors.find((c) => c.id === selectedColorId);

  return (
    <div>
      <h4 className="text-[9px] tracking-[0.25em] text-white/25 uppercase mb-3">
        Exterior Color
      </h4>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Exterior color">
        {car.colors.map((color) => {
          const isSelected = color.id === selectedColorId;
          return (
            <button
              key={color.id}
              onClick={() => { setColor(color.id); playTick(); }}
              className={`
                relative w-10 h-10 rounded-full transition-all duration-300 focus-ring
                ${isSelected
                  ? 'ring-1 ring-white/40 ring-offset-2 ring-offset-[#0a0a0b] scale-110'
                  : 'ring-1 ring-white/8 hover:ring-white/20 hover:scale-105'}
              `}
              style={{ backgroundColor: color.hex }}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${color.name}${color.price > 0 ? ` (+$${color.price.toLocaleString()})` : ''}`}
            />
          );
        })}
      </div>
      {selectedColor && (
        <p className="mt-3 text-[11px] text-white/30 font-light tracking-wide">
          {selectedColor.name}
          {selectedColor.price > 0 && (
            <span className="text-white/20 ml-2">+${selectedColor.price.toLocaleString()}</span>
          )}
        </p>
      )}
    </div>
  );
}
