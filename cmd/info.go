package cmd

import (
	"github.com/nexentra/midgard/cmd/info"
	"github.com/nexentra/midgard/pkg/clients/logger"
	"github.com/nexentra/midgard/pkg/config"

	"github.com/spf13/cobra"
)

// infoCmd represents the info command
var infoCmd = &cobra.Command{
	Use:   "info",
	Short: "Print service env and config info",
	Long: `Print information related to the service environment and feature configuration. 
This command is a helper to get you started in your debugging journey.`,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...

	infoCmd.PersistentFlags().BoolVarP(&config.NoBorderFlag, "no-border", "N", false, "Print tables without border")

	infoCmd.AddCommand(info.EnvCmd)
	infoCmd.AddCommand(info.FeaturesCmd)
	infoCmd.AddCommand(info.HiddenApiRoutesCmd)
	infoCmd.AddCommand(info.ProtectedApiRoutesCmd)
	infoCmd.AddCommand(info.PublicApiRoutesCmd)
	infoCmd.AddCommand(info.PrimaryApiRoutesCmd)
	infoCmd.AddCommand(versionCmd)

	infoCmd.PersistentPreRun = func(cmd *cobra.Command, args []string) {
		rootCmd.PersistentPreRun(cmd, args)
		execInfoPersistentPreRun()
	}

	// Register info command
	rootCmd.AddCommand(infoCmd)
}

func execInfoPersistentPreRun() {
	logger.Debug("Executing info persistent pre run ...")

	// You can initialize other features here ...
	// this will run before any command, make sure to put only global initializations here
	// to avoid running into nil pointers or undefined variables
	// ...
}
