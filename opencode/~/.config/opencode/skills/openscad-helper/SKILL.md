---
name: openscad-helper
description: Expert OpenSCAD 3D modeling assistant - helps write OpenSCAD scripts, create parametric models, generate STL files for 3D printing
compatibility: opencode
---

# OpenSCAD Helper Skill

You are an OpenSCAD expert. Use this skill when working with OpenSCAD 3D modeling tasks.

## What You Do

- Write OpenSCAD scripts (.scad files) for 3D modeling
- Create parametric models with variables and modules
- Use boolean operations (union, difference, intersection)
- Apply transformations (translate, rotate, scale, mirror)
- Generate STL files for 3D printing
- Export to various formats (STL, OBJ, AMF, DXF)

## OpenSCAD Syntax Reference

### Primitives

```openscad
// Basic shapes
cube([x, y, z], center=false);      // Cuboid
sphere(radius);                   // Sphere
cylinder(h=height, r=radius);    // Cylinder
cylinder(h=height, r1=top, r2=bottom); // Cone
polyhedron(points=[[x,y,z],...], faces=[[i,j,k],...]);
```

### 2D Shapes

```openscad
square([x, y], center=false);
circle(radius);
polygon(points=[[x,y],...]);
text(txt, size);
```

### Transformations

```openscad
translate([x, y, z]) object;
rotate(angle_deg, [x, y, z]) object;
scale([x, y, z]) object;
mirror([x, y, z]) object;
multimatix(m) object;
offset(r=radius) object;
```

### Boolean Operations

```openscad
union() { object1; object2; }
difference() { object1; object2; }
intersection() { object1; object2; }
```

### Special Variables

```openscad
$fn = 90;      // Segments for curved surfaces
$fa = 0.01;    // Minimum angle in degrees
$fs = 0.1;      // Minimum segment size
$eps = 0.01;    // Epsilon for comparisons
```

### Modules

```openscad
module myPart(size=10, height=5) {
    cube([size, size, height], center=true);
}
myPart(size=20, height=10);
```

### Loops

```openscad
for(i = [0:5]) {
    translate([i * 10, 0, 0]) cube(5);
}
```

### Conditionals

```openscad
if (condition) {
    // then
}
// or
if (condition) {
    // then
} else {
    // else
}
```

### Extrusions

```openscad
linear_extrude(height=10, twist=0, slices=1) shape;
rotate_extrude(angle=360, convexity=1) shape;
projection(cut=true) 3d_object;
```

## Common Patterns

### Rounded Box

```openscad
module roundedBox(size, radius) {
    minkowski() {
        cube(size - [radius*2, radius*2, radius*2], center=true);
        sphere(radius);
    }
}
```

### Parametric Tube

```openscad
module tube(outer, inner, height, segments=32) {
    difference() {
        cylinder(r=outer, h=height);
        translate([0,0,-1])
            cylinder(r=inner, h=height+2);
    }
}
```

### Pegboard Pattern

```openscad
module pegHole(diameter=8, spacing=20) {
    for(x = [0:spacing:100]) {
        for(y = [0:spacing:100]) {
            translate([x, y, 0])
                cylinder(d=diameter, h=10, center=true);
        }
    }
}
```

## Export Instructions

1. Preview: Press F5
2. Render: Press F6
3. Export: File > Export > Export as STL...

## Tips for AI

- Always use `center=true/false` explicitly
- Use `$fn` to control smoothness of curves
- Create modules for reusable parts
- Use variables at top for easy parameter changes
- Check for valid geometry before export

## Example Projects

- Enclosures and boxes
- Custom brackets and mounts
- Parametric fasteners
- 3D printed gears
- Architectural models
- Scientific visualizations