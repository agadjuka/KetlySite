import {
  LucideIcon,
  TrendingUp,
  Briefcase,
  Sliders,
  Database,
  Monitor,
  AlertTriangle,
  Sparkles,
  Rocket,
} from 'lucide-react';
import type { Dictionary } from '@/lib/dictionary';

type CapabilityDictionaryEntry = Dictionary['capabilities'][number];
type CapabilityId = CapabilityDictionaryEntry['id'];

const visualConfig: Record<
  CapabilityId,
  {
    icon: LucideIcon;
    color?: string;
  }
> = {
  benefits: { icon: TrendingUp, color: 'violet' },
  audience: { icon: Briefcase, color: 'indigo' },
  customization: { icon: Sliders, color: 'purple' },
  integrations: { icon: Database, color: 'sky' },
  control: { icon: Monitor, color: 'cyan' },
  edgeCases: { icon: AlertTriangle, color: 'orange' },
  testDrive: { icon: Sparkles, color: 'blue' },
  contact: { icon: Rocket, color: 'emerald' },
};

export type Capability = CapabilityDictionaryEntry & {
  icon: LucideIcon;
  color?: string;
};

export function mapCapabilities(entries: readonly CapabilityDictionaryEntry[]): Capability[] {
  return entries.map((entry) => {
    const visual = visualConfig[entry.id];

    return {
      ...entry,
      icon: visual?.icon ?? Sparkles,
      color: visual?.color,
    };
  });
}

