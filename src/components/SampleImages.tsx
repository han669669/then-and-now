import { Button } from '@heroui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import sampleBefore from '@/assets/sample-before.jpg';
import sampleAfter from '@/assets/sample-after.jpg';

interface Props {
  onLoadSamples: () => void;
  isCollapsed?: boolean;
}

export function SampleImages({ onLoadSamples, isCollapsed = false }: Props) {
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);

  // Update expanded state when isCollapsed prop changes
  useEffect(() => {
    setIsExpanded(!isCollapsed);
  }, [isCollapsed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden"
    >
      {/* Header - Always visible */}
      <div 
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-800/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-sm font-semibold text-white">Try Sample Images</h3>
          <p className="text-xs text-gray-400">
            {isExpanded ? 'Click to collapse' : 'Click to expand demo images'}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="flex gap-3 mb-4">
                <div className="flex-1">
                  <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-[4/3]">
                    <img
                      src={sampleBefore}
                      alt="Sample before image"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-xs text-white font-medium">Before</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-[4/3]">
                    <img
                      src={sampleAfter}
                      alt="Sample after image"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-xs text-white font-medium">After</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                color="primary"
                variant="solid"
                onPress={onLoadSamples}
                className="w-full font-semibold"
                size="md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Load Sample Images
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}