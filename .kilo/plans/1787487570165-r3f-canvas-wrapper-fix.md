# Fix: R3F Canvas Wrapper for CaseStudyTechStack

## Problem
`SecuritySphere.tsx` (and other 3D visual components) uses the `useFrame` hook from `@react-three/fiber`, which can only be used within a `<Canvas>` component. Currently, `CaseStudyTechStack.tsx` renders `ProjectVisual` directly without a Canvas wrapper, causing the runtime error:

```
R3F: Hooks can only be used within the Canvas component!
```

## Root Cause
- `CaseStudyTechStack.tsx` (line 35-40) uses `ProjectVisual` directly inside a regular `<div>`
- `ProjectVisual` → `SecuritySphere` uses `useFrame` which requires R3F context
- Other 3D scenes in the project (e.g., `ProjectUniverseCanvas`) properly wrap content in `SceneCanvas` which provides the `<Canvas>` context

## Solution
Wrap the `ProjectVisual` component in `CaseStudyTechStack.tsx` with `SceneCanvas` (similar to `ProjectUniverseCanvas` pattern).

## Files to Modify
1. `src/components/case-study/CaseStudyTechStack.tsx` - Add `SceneCanvas` wrapper around `ProjectVisual`

## Implementation Steps

### 1. Update CaseStudyTechStack.tsx
- Import `SceneCanvas` from `@/components/three/SceneCanvas`
- Wrap `ProjectVisual` with `SceneCanvas` providing appropriate camera settings
- Pass `tier`, `reducedMotion`, `pointerEvents`, and `label` props to `SceneCanvas`

### Camera Settings
Use a camera appropriate for the security sphere visualization:
- Position: `[0, 0, 4]` (closer than universe scene since it's a single object)
- FOV: 45 (default)

### Props to Pass
```tsx
<SceneCanvas
  camera={{ position: [0, 0, 4], fov: 45 }}
  tier="high"
  reducedMotion={false}
  pointerEvents={false}
  label="Security Operations Center core visualization"
>
  <ProjectVisual kind={project.visual} reduced={false} hovered={false} density={1} />
</SceneCanvas>
```

## Testing
- Run `npm run dev` and navigate to a project page with a visual (e.g., `/projects/soc-platform`)
- Verify no R3F error appears
- Verify 3D visualization renders correctly
- Run `npm run build` to ensure production build works

## Out of Scope
- Other 3D components (they already use SceneCanvas correctly)
- Performance optimization for case study 3D scenes