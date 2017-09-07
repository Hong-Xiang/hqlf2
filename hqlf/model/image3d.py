""" A abstract of data3d element """
from pathlib import Path
import numpy as np
from bokeh.embed import components
from bokeh.plotting import figure, show, output_file
from bokeh.layouts import gridplot
from bokeh.models.ranges import Range1d
import re
import json


class Image3D:
    def __init__(self, path):
        self.path = Path(path)
        self.npf = np.load(self.path)
        self.shape = self.npf.shape
        self.data = np.array(self.npf)
        self.debug = True

    def sliced_data(self, id_slice, axis):
        sli = [slice(n) for n in self.shape]
        sli[axis] = id_slice
        return self.data[sli]
    # def imshow(self, id_slice, axis, x_range, y_range, dw, dh, x0, y0):
    #     if self.debug:
    #         return self.imshow_n(id_slice, axis, x_range, y_range, dw, dh, x0, y0)
    #     else:
    #         return self.imshow_o(id_slice, axis, x_range, y_range, dw, dh, x0, y0)

    def draw_view(self, id_slice, axis, x_range, y_range):
        def get_min_max(a_range):
            if isinstance(a_range, Range1d):
                rmin = a_range.start
                rmax = a_range.end
            else:
                rmin = a_range[0]
                rmax = a_range[1]
            return rmin, rmax, rmax - rmin
        x0, x1, dw = get_min_max(x_range)
        y0, y1, dh = get_min_max(y_range)

        p = figure(x_range=x_range, y_range=y_range)
        p.image(image=[self.sliced_data(id_slice, axis)], x=x0,
                y=y0, dw=dw, dh=dh, palette="Spectral11")
        return p

    def head(self):
        return {'views': [], 'shape': self.data.shape, 'path': str(self.path.absolute())}

    def imshow(self, id_slice, axis):
        x_range = (-self.shape[axis] / 2, self.shape[axis] / 2)
        y_range = (-self.shape[(axis + 1) % 3] / 2,
                   self.shape[(axis + 1) % 3] / 2)
        p = self.draw_view(id_slice, axis, x_range, y_range)
        comp = components(p)
        pa = re.compile(r'.*id="([0-9a-f-]*)".*', re.DOTALL)
        id_div = pa.match(comp[1])[1]
        js = comp[0]

        views = [None, None, None]
        views[axis] = {'ids': id_slice, 'idd': id_div, 'js': js}
        return {'views': views, 'shape': self.sliced_data(id_slice, axis).shape, 'path': str(self.path.absolute())}

    def imshow3(self, id_slice):
        x_range = (-self.shape[0] / 2, self.shape[0] / 2)
        y_range = (-self.shape[1] / 2, self.shape[1] / 2)
        z_range = (-self.shape[2] / 2, self.shape[2] / 2)

        pz = self.draw_view(id_slice[2], 2, x_range, y_range)
        py = self.draw_view(id_slice[1], 1, pz.x_range, z_range)
        px = self.draw_view(id_slice[0], 0, pz.y_range, py.y_range)

        # p1 = self.draw_view(id_slice[0], 0)
        # p2 = self.draw_view(id_slice[0], 0)
        # p3 = self.draw_view(id_slice[0], 0)
        # p2 = figure(x_range=p1.x_range, y_range=z_range)
        # p2.image(image=[shape[:, id_slice[1], :]], x=x0, y=y0,
        #          dw=dw, dh=dh, palette="Spectral11")
        # p3 = figure(x_range=p1.y_range, y_range=p2.y_range)
        # p3.image(image=[shape[id_slice[1], :, :]], x=x0, y=y0,
        #          dw=dw, dh=dh, palette="Spectral11")
        # p = gridplot([[p1, p2], [p3, ]])

        webs = components({"xview": px, "yview": py, "zview": pz})
        pa = re.compile(r'.*id="([0-9a-f-]*)".*', re.DOTALL)
        id_div = []
        id_div.append(pa.match(webs[1]['xview'])[1])
        id_div.append(pa.match(webs[1]['yview'])[1])
        id_div.append(pa.match(webs[1]['zview'])[1])
        js = webs[0]
        views = []
        for i in range(3):
            views.append({'ids': id_slice[i], 'idd': id_div[i], 'js': None})
        views[0]['js'] = js
        return {'views': views, 'shape': self.shape, 'path': str(self.path.absolute())}

    # def imshow_o(self, id_slice, axis, x_range, y_range, dw, dh, x0, y0):
    #     shape = self.data
    #     x_range = (-3, 3)
    #     y_range = (-3, 3)
    #     z_range = (-3, 3)
    #     x_show = 50
    #     y_show = 50
    #     z_show = 50
    #     dw = 6
    #     dh = 6
    #     x0 = -3
    #     y0 = -3
    #     p1 = figure(x_range=x_range, y_range=y_range)
    #     p1.image(image=[shape[:, :, z_show]], x=x0, y=y0,
    #             dw=dw, dh=dh, palette="Spectral11")
    #     p2 = figure(x_range=p1.x_range, y_range=z_range)
    #     p2.image(image=[shape[:, y_show, :]], x=x0, y=y0,
    #             dw=dw, dh=dh, palette="Spectral11")
    #     p3 = figure(x_range=p1.y_range, y_range=p2.y_range)
    #     p3.image(image=[shape[x_show, :, :]], x=x0, y=y0,
    #             dw=dw, dh=dh, palette="Spectral11")
    #     p = gridplot([[p1, p2], [p3, ]])

    #     webs = components(p)
    #     pa = re.compile(r'.*id="([0-9a-f-]*)".*', re.DOTALL)
    #     id_div = pa.match(webs[1])[1]
    #     js = webs[0]

    #     return {'id': id_div, 'js': js}
