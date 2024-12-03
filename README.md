# RRPL Web GUI
RPL GUI for visualizing real-time telemetry data. Client side is built using React and Server side is built in Python. The server handles incoming packets from the board and sends it the client via websockets to be displayed in the GUI.

## First Time Set Up
1) Clone the repo
    ```
    gh repo clone Rutgers-RPL/socket-rocket
    ```
2) Install the required python packages
    ```
    pip install requirements.txt
    ```
3) Navigate to the GUI
    ```
    cd react-gui
    ```
4) Install the required node packages
    ```
    npm install i
    ```

## Running the GUI
### GUI
1) Navigate to react-gui
    ```
    cd react-gui
    ```
2) Run the following command
    ```
    npm start dev
    ```
### Server
1) Plug in the board **prior** to running the server
2) Run the following command
    ```
    python server.py
    ```
3) The server will prompt you to select the port by inputting the corresponding number\
    **Note**: If the board gets disconnected, you must **restart** the server.


## Maps Set Up

### Open Street Maps
1) Download [Maperitive](http://maperitive.net/)
2) Navigate to [Open Street Maps](https://www.openstreetmap.org/)

3) Click **"Export"** and select **"Manually select a different area"** on the sidebar on the left.
    ![Error Displaying Image!](/img/osm.png "OSM Export")

4) Chose the desired area and click export, which will download a .osm file
   
   **Note**: Sometimes the area might too large/contain too many objects so you may have to re-size until OSM lets you export it
   

5) Open Maperitive, navigate to the top bar and click **Map > Clear Map**. Then navigate to **File > Open Map Sources** and select the downloaded .osm file.
    ![Error Displaying Image!](/img/maperitive-toolbar.png "Toolbar")
    

    ![Error Displaying Image!](/img/maperitive-clear.png "Clear Map")

    ![Error Displaying Image!](/img/maperitive-openmap.png "Open Map Sources")



6) Still in Maperitive, navigate to **Tools > Generate Tiles**. This will generate tiles and place them in the "Tiles" folder, which is in the same directory as Maperitive.exe
    ![Error Displaying Image!](/img/maperitive-generate.png "Generate Tiles")
    ![Error Displaying Image!](/img/maperitive-tiles.png "Tiles Folder")


7) Copy-paste the "Tiles" folder (found in the same directory as Maperitive) into **react-gui/public**

8) To generate new tiles, navigate to **Tools > Clear Web Cache** to delete the existing tiles or manually delete them from the "Tiles" folder. Then repeat the steps above.


### Sattelite Map
1) Navigate to [LAADS NASA](https://ladsweb.modaps.eosdis.nasa.gov/view-data/)
2) Zoom into the desired area

   **Note**: For best results, I suggest searching by Lat, Long by clicking on the marker icon on the left and choosing find location
   ![Error Displaying Image!](/img/laads-location.png "LAADS Find Location")


3) Click capture in the bottom, **de-select** all check boxes, and download as a **GeoTIFF file**
    ![Error Displaying Image!](/img/laads-capture.png "OSM Export")



4) Then rename the saved .tiff file to '**sattelite.tiff**'
   
   **Note**: Make the sure the spelling is correct. Web frameworks can only read explicit file paths and the saved .tiff file always changes name depending on its location.

5) Copy-paste **sattelite.tiff** into **react-gui/public**

   