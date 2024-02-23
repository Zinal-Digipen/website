local display = require("display")

-- Create a group to hold the visual elements
local group = display.newGroup()

-- Create and position the labels
local labels = {
    "IP Address:",
    "Country:",
    "Region:",
    "City:",
    "Latitude:",
    "Longitude:"
}

local yPos = 50
local labelRef = {}

for i = 1, #labels do
    local label = display.newText({
        parent = group,
        text = labels[i],
        x = display.contentCenterX,
        y = yPos,
        fontSize = 20
    })
    label.anchorX = 0
    labelRef[i] = label

    yPos = yPos + 40
end

-- Create and position the spans
local spans = {
    { id = "ip-address", text = "" },
    { id = "country", text = "" },
    { id = "region", text = "" },
    { id = "city", text = "" },
    { id = "latitude", text = "" },
    { id = "longitude", text = "" }
}

for i = 1, #spans do
    local span = display.newText({
        parent = group,
        text = spans[i].text,
        x = display.contentCenterX + 120,
        y = labelRef[i].y,
        fontSize = 20
    })
    span.anchorX = 0
    span.id = spans[i].id
end

-- Function to update the span texts
local function updateSpanTexts(data)
    for i = 1, #spans do
        local span = group[spans[i].id]
        span.text = data[spans[i].id]
    end
end

-- Example usage: Call updateSpanTexts with data received from a server

local data = {
    ["ip-address"] = "192.168.0.1",
    ["country"] = "United States",
    ["region"] = "California",
    ["city"] = "San Francisco",
    ["latitude"] = "37.7749",
    ["longitude"] = "-122.4194"
}

updateSpanTexts(data)