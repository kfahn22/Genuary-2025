# https://matplotlib.org/stable/api/markers_api.html#module-matplotlib.markers

# https://matplotlib.org/stable/gallery/color/set_alpha.html

import random
import matplotlib.colors as mcolors

# Define new colormap
import matplotlib.pyplot as plt
import numpy as np

from matplotlib.colors import LinearSegmentedColormap
colors1 = mcolors.CSS4_COLORS
colors2 = mcolors.XKCD_COLORS

def make_colormap(n_bins, color_choices=None):
    """Return a LinearSegmentedColormap
    color1 and color2 are the two colors that are interpolated between
    n_bins: Discretizes the interpolation into bins
    """
    if color_choices is None:
        colors = colors2
    color_name1 = random.choice(list(colors.keys()))
    color_name2 = random.choice(list(colors.keys()))
    color1 = colors[color_name1]
    color2 = colors[color_name2]
    cmap_name = color_name1 + '/' + color_name2
    color_choices = [color1, color2]
    for n_bin in range(n_bins):
      cmap = LinearSegmentedColormap.from_list(cmap_name, color_choices, N=n_bin)
    return cmap, color_name1, color_name2

import numpy as np
import matplotlib.pyplot as plt

def ten_print(colors, path):
    rows = 20
    cols = 20
    pattern = np.random.choice([0, 1], size=(rows, cols), p=[0.3, 0.7])

    # Plot the pattern with thicker lines

    
    plt.figure(figsize=(4, 4))
    plt.scatter(*np.where(pattern == 0), s=150, lw=3, marker="D", color=colors[1], alpha = 0.5)
    plt.scatter(*np.where(pattern == 1), s=100, lw=3, marker="d", color=colors[1], alpha = 0.8)
    plt.axis('off')

    save_path = path

    # Save the plot
    plt.savefig(save_path, bbox_inches='tight', facecolor=colors[2])
    plt.close()

color = make_colormap(5)
path = f'1.png'
ten_print(color, path)