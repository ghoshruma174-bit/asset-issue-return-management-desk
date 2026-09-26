package com.assetmanagement.Controller;

import com.assetmanagement.Entity.Asset;
import com.assetmanagement.Service.AssetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:5173")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    // GET all assets
    @GetMapping
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }

    // GET asset by ID
    @GetMapping("/{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long id) {

        return assetService.getAssetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE asset
    @PostMapping
    public Asset createAsset(@RequestBody Asset asset) {
        return assetService.createAsset(asset);
    }

    // UPDATE asset
    @PutMapping("/{id}")
    public Asset updateAsset(
            @PathVariable Long id,
            @RequestBody Asset asset) {

        return assetService.updateAsset(id, asset);
    }

    // DELETE asset
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {

        assetService.deleteAsset(id);

        return ResponseEntity.noContent().build();
    }
}
