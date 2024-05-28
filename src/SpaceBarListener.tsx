import React, { useEffect } from 'react';

interface SpaceBarListenerProps {
  onResponse: () => void;
}

const SpaceBarListener: React.FC<SpaceBarListenerProps> = ({ onResponse }) => {
  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        onResponse();
      }
    };

    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onResponse]);

  return (
    <div>
      <p>Press the space bar to respond.</p>
    </div>
  );
};

export default SpaceBarListener;
